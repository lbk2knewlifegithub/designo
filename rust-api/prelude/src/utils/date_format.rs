pub mod date_format {
    use chrono::NaiveDateTime;
    use serde::{self, Deserialize, Deserializer, Serializer};
    use tracing::error;

    const FORMAT: &'static str = "%Y-%m-%dT%H:%M:%S%Z";

    pub fn serialize<S>(date: &NaiveDateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = format!("{}", date.format(FORMAT));
        serializer.serialize_str(&s)
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        match NaiveDateTime::parse_from_str(&s, FORMAT) {
            Ok(date) => Ok(date),
            Err(e) => {
                error!("InvoiceApp CreateInvoiceDTO: Invalid date: {}", e);
                Err(serde::de::Error::custom("Invalid date"))
            }
        }
    }
}
