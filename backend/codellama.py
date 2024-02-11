from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from langchain import HuggingFacePipeline
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


model_name_or_path = "TheBloke/CodeLlama-13B-Instruct-GPTQ"

model = AutoModelForCausalLM.from_pretrained(model_name_or_path,
                                             device_map="auto",
                                             trust_remote_code=True,
                                             revision="main")

tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, use_fast=True)

DEFAULT_SYSTEM_PROMPT = """
Hello, Act as a helpful and truthful codegenerator chatbot.
If you encounter a question you don't have information on, simply say 'I don't know about that.'ypu can only able to generate code 
Be user-friendly and provide assistance where needed. Ready to start our conversation!

""".strip()

def generate_prompt(prompt: str, system_prompt: str = DEFAULT_SYSTEM_PROMPT) -> str:
    return f"""
[INST] <>
{system_prompt}
<>

{prompt} [/INST]
""".strip()

template = generate_prompt(
"""


Question: {query}
""",
    system_prompt=DEFAULT_SYSTEM_PROMPT,
)

prompt = PromptTemplate(

input_variables=["query"],

template = template


)

pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    do_sample=True,
    temperature=0.7,
    top_p=0.95,
    top_k=40,
    repetition_penalty=1.1
)



llm = HuggingFacePipeline(pipeline=pipe, model_kwargs={"temperature": 0})

chain = LLMChain(llm= llm, prompt= prompt)

@app.post("/code_generator")
async def code_generator(request:Request):
    req = await request.json()
    res = chain.run(req.get("request"))
    
    return {"response": res}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)