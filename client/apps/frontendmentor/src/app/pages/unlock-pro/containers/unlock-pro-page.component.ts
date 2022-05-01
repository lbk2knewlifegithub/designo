import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fromData, Question } from '../../../shared';
import { Testimonial } from '../components';

@Component({
  selector: 'lbk-unlock-pro-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './unlock-pro-page.component.html',
})
export class UnlockProPageComponent implements OnInit {
  florinTestimonial!: Testimonial;
  jessicaTestimonial!: Testimonial;
  tiffanyTestimonial!: Testimonial;
  jakubTestimonial!: Testimonial;

  subscriptionQuestions!: Question[];

  ngOnInit(): void {
    this.subscriptionQuestions = fromData.subscriptionQuestions;
    this.florinTestimonial = {
      name: 'FLORIN POP',
      image: 'assets/images/unlock-pro/profile-florin.jpeg',
      description: `Something like this would have helped me a lot when I started out, but
        I'm happy that it exists for those who are starting out now!`,
      job: 'Web Developer & YouTuber',
    };

    this.jessicaTestimonial = {
      name: 'JESSICA CHAN',
      image: 'assets/images/unlock-pro/profile-jessica.jpeg',
      description: `
        Frontend Mentor is a win-win. You can sharpen your skills building websites, and add finished projects to your portfolio to help land a job!
        `,
      job: 'Web Developer & YouTuber',
    };

    this.tiffanyTestimonial = {
      name: 'TIFFANY ARELLANO',
      image: 'assets/images/unlock-pro/profile-tiffany.jpeg',
      description: `The projects are an amazing way to get started for growing devs and challenging enough for mid-levels as well. Plus, I did manage to score an interview BECAUSE of those projects!`,
      job: 'Front-end Developer',
    };

    this.jakubTestimonial = {
      name: 'JAKUB FIGLAK',
      image: 'assets/images/unlock-pro/profile-jakub.jpeg',
      description: `The premium challenges allow me to test my skills by building more complex websites. I strongly recommend using Frontend Mentor challenges to build your portfolio.`,
      job: 'Front-end Developer',
    };
  }
}
