from openai import OpenAI
import os

with open('page.txt', 'r') as file:
    content = file.read()

client = OpenAI(api_key=os.environ.get("OPENAI_KEY"))
response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an expert on creating SEO articles."},
    {"role": "user", "content": f"Please write a web page based on productivity, using this page as a template: {content}"},
  ]
)

with open('productivity.html', 'w') as file:
    file.write(response.choices[0].message.content)