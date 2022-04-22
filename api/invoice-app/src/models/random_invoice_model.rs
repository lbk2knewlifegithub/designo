use fake::faker::{
    address::en::{CityName, CountryName, PostCode, StreetName},
    chrono::en::Date,
    internet::en::FreeEmail,
    lorem::en::Sentence,
    name::en::Name,
};
use fake::Fake;
use rand::{seq::SliceRandom, Rng};
use serde_derive::Serialize;

#[derive(Serialize)]
struct RandomAddress {
    street: String,
    city: String,
    #[serde(rename(serialize = "postCode"))]
    post_code: String,
    country: String,
}

impl RandomAddress {
    fn random() -> Self {
        Self {
            street: StreetName().fake(),
            city: CityName().fake(),
            post_code: PostCode().fake(),
            country: CountryName().fake(),
        }
    }
}

#[derive(Serialize)]
struct RandomItem {
    name: String,
    price: f32,
    quantity: u32,
}

impl RandomItem {
    fn random() -> Self {
        Self {
            name: Sentence(3..5).fake::<String>(),
            price: (10.0..10_000.0).fake::<f32>(),
            quantity: (0..1_000).fake::<u32>(),
        }
    }
}

#[derive(Serialize)]
pub struct RandomInvoice {
    #[serde(rename(serialize = "paymentTerms"))]
    payment_terms: i32,

    description: String,

    #[serde(rename(serialize = "createdAt"))]
    created_at: String,

    #[serde(rename(serialize = "clientName"))]
    client_name: String,

    #[serde(rename(serialize = "clientEmail"))]
    client_email: String,

    status: String,

    #[serde(rename(serialize = "senderAddress"))]
    sender_address: RandomAddress,

    #[serde(rename(serialize = "clientAddress"))]
    client_address: RandomAddress,

    items: Vec<RandomItem>,
}

impl RandomInvoice {
    pub fn random() -> Self {
        Self {
            payment_terms: [1, 7, 30]
                .choose(&mut rand::thread_rng())
                .unwrap()
                .to_owned(),
            description: Sentence(3..6).fake(),
            created_at: Date().fake(),
            client_name: Name().fake(),
            client_email: FreeEmail().fake(),
            status: ["pending", "draf", "paid"]
                .choose(&mut rand::thread_rng())
                .unwrap()
                .to_string(),
            sender_address: RandomAddress::random(),
            client_address: RandomAddress::random(),
            items: (1..rand::thread_rng().gen_range(2..5))
                .map(|_| RandomItem::random())
                .collect(),
        }
    }
}
