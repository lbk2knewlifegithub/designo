use tokio::{fs, io::AsyncReadExt};
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct TmpFile {
    pub path: String,
    pub extension: String,
    pub only_name: String,
}

impl TmpFile {
    pub fn random_name(extension: &str) -> TmpFile {
        let random = Uuid::new_v4().to_string();
        TmpFile {
            path: format!("/tmp/{}.{}", random, extension),
            only_name: random,
            extension: extension.to_owned(),
        }
    }

    // write String
    pub async fn write_string(&self, content: &str) -> () {
        fs::write(&self.path, content)
            .await
            .expect("Failure to write file")
    }

    // Read String
    pub async fn read_string(&self) -> String {
        let mut file = fs::File::open(&self.path).await.expect("Open file failure");
        let mut contents = vec![];
        file.read_to_end(&mut contents)
            .await
            .expect("Read data in file failure.");
        String::from_utf8(contents).expect("Convert vec![u8] to strinf failure.")
    }

    // Delete File
    pub async fn delete_file(&self) -> () {
        fs::remove_file(&self.path)
            .await
            .expect(&format!("Failed not found {}", self.path))
    }
}
