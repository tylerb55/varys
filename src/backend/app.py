import fastapi
import uvicorn
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = fastapi.FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/api/calculate-sentiment")
def calculate_sentiment(text: str):
    tokenizer = AutoTokenizer.from_pretrained("nlptown/bert-base-uncased-sentiment")
    model = AutoModelForSequenceClassification.from_pretrained("nlptown/bert-base-uncased-sentiment")
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    sentiment = torch.argmax(outputs.logits, dim=1).item() # 0 = negative, 1 = positive
    return {"sentiment": sentiment}

@app.get("/api/get-reviews")
def get_reviews(source: str):
    # TODO: Implement this
    # pull revi
    return

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

# http://0.0.0.0:8000/api/calculate-sentiment?text=I%20love%20this%20product!
