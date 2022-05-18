import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Issue, Report, Solution, SolutionDTO } from '@lbk/fm/shared';
import { API_URL } from '@lbk/tokens';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HubService {
  constructor(
    private readonly _http: HttpClient,
    @Inject(API_URL)
    private readonly _apiURL: string
  ) {}

  /**
   * - Load Solutions For Challenge
   * @param id
   * @returns
   */
  loadSolutionsForChallange(id: string): Observable<Solution[]> {
    return this._http.get<Solution[]>(
      `${this._apiURL}/frontendmentor/solutions/${id}/challenge`
    );
  }

  /**
   * - Create Solution
   * @param challengeID
   * @param dto
   * @returns
   */
  createSolution(
    challengeID: string,
    dto: SolutionDTO
  ): Observable<{
    solutionID: string;
    screenshot: string;
    report: Report;
  }> {
    return this._http
      .post<{
        solutionID: string;
        reportID: string;
      }>(`${this._apiURL}/frontendmentor/solution`, {
        challengeID,
        ...dto,
      })
      .pipe(
        switchMap(({ solutionID, reportID }) => {
          const takeScreenshot$ = this._http.post<{ screenshot: string }>(
            `${this._apiURL}/upload/screenshot`,
            {
              url: dto.liveSiteURL,
              solutionID,
            }
          );

          const a11yReport$ = this._http.post<Issue[]>(
            `${this._apiURL}/frontendmentor/reports/solution/a11y`,
            {
              url: dto.liveSiteURL,
              solutionID,
              reportID,
            }
          );

          const htmlValidator$ = this._http.post<Issue[]>(
            `${this._apiURL}/frontendmentor/reports/solution/html-validator`,
            {
              url: dto.liveSiteURL,
              solutionID,
              reportID,
            }
          );

          return forkJoin([takeScreenshot$, a11yReport$, htmlValidator$]).pipe(
            map(([{ screenshot }, a11y, htmlValidator]) => {
              return {
                solutionID,
                screenshot,
                report: {
                  a11y,
                  htmlValidator,
                  createdAt: new Date().toUTCString(),
                },
              };
            })
          );
        })
      );
  }

  /**
   * - Update Solution
   * @param solutionID
   * @param dto
   * @returns
   */
  updateSolution(solutionID: string, dto: SolutionDTO): Observable<string> {
    return this._http
      .put<{ screenshot: string }>(
        `${this._apiURL}/frontendmentor/solution/${solutionID}`,
        {
          dto,
        }
      )
      .pipe(map(({ screenshot }) => screenshot));
  }

  /**
   * - Delete Solution
   * @param id
   * @returns
   */
  deleteSolution(id: string): Observable<void> {
    return this._http.delete<void>(
      `${this._apiURL}/frontendmentor/solution/${id}`
    );
  }
}
