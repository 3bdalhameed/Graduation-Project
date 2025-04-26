import os
import google.generativeai as genai
import difflib

genai.configure(api_key="AIzaSyB3waCyrFLd4uGNT_cTsYBhhclVaHvfPn0")

# Create the model
generation_config = {
  "temperature": 2,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 500,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
system_instruction = """
You are a cybersecurity awareness assistant working as part of the JuCC team. Your role is to answer awareness questions in cybersecurity based on trusted global standards such as those from CISA (Cybersecurity and Infrastructure Security Agency) and NCSC (National Cyber Security Centre).

Always give answers that are short, simple, and easy to understand, avoiding technical jargon. Your audience includes students with limited cybersecurity knowledge, so be friendly and clear in your responses.

When relevant, briefly mention whether the advice is based on CISA, NCSC, or both, to show the source of the information.

You are also knowledgeable about JUCC (University of Jordan Cybersecurity Center). JUCC is a student-led initiative at the University of Jordan that focuses on raising cybersecurity awareness among students. It organizes gamified competitions, educational campaigns, events, and workshops to help students learn about cybersecurity in fun and interactive ways. If asked about JUCC, share information about its mission, activities, and how students can get involved.

Additionally, you are familiar with the University of Jordan. It is the oldest and largest university in Jordan, known for its academic excellence and vibrant campus life. The University of Jordan offers a wide range of undergraduate and graduate programs and is a hub for innovation, research, and student activities. If asked about the university, provide friendly and informative answers suitable for prospective or current students.
"""

,
)

jucc_info = {
    "what is jucc": (
        "JUCC (University of Jordan Cybersecurity Center) is the University of Jordan’s first cybersecurity platform. "
        "It aims to promote cybersecurity awareness through education, assessment, innovation, and fun."
    ),
    "how can i join jucc": (
        "You can join JUCC by participating in our events, workshops, and challenges, or following us on Instagram @jucc_ujo. "
        "Opportunities are available throughout the academic year!"
    ),
    "who leads jucc": (
        "JUCC is supervised by Prof. Iman Al Momani from the University of Jordan and is run by a dedicated team of cybersecurity-enthusiastic students."
    ),
    "what services does jucc offer": (
        "JUCC offers four main services:\n"
        "1. Awareness & Media – Creative visuals, videos, and campaigns to raise cybersecurity awareness.\n"
        "2. Assessment Service – Tools and platforms for cybersecurity self-checks, evaluations, and practical learning.\n"
        "3. Cyber Hub – A centralized platform for training, competitions, and community engagement.\n"
        "4. JCCT (Jordan Cybersecurity Compliance Tool) – A free platform for hosting CTFs, creating assessments, and aligning with the Jordan National Cybersecurity Framework (JNCSF)."
    ),
    "what is jcct": (
        "JCCT (Jordan Cybersecurity Compliance Tool) is a free, user-friendly platform developed by JUCC. "
        "It helps users host or join Capture The Flag (CTF) challenges, create cybersecurity assessments, and assess compliance with the Jordan National Cybersecurity Framework (JNCSF)."
    ),
}
def get_jucc_answer(user_input):
    # Try to match the user's question with a JUCC key using fuzzy matching
    matches = difflib.get_close_matches(user_input.lower(), jucc_info.keys(), n=1, cutoff=0.6)
    if matches:
        return jucc_info[matches[0]]
    return None

while True:
    user_input = input("You: ").strip()

    if user_input.lower() in ["exit", "quit"]:
        print("JuCCBot: Goodbye! Stay cyber-safe!")
        break

    # Check if it's a JUCC-related question
    jucc_response = get_jucc_answer(user_input)
    if jucc_response:
        print(f"JuCCBot: {jucc_response}")
        continue

    # If not, use Gemini
    chat_session = model.start_chat(history=history)
    response = chat_session.send_message(user_input)
    model_response = response.text
    print(f'JuCCBot: {model_response}')
    print()

    history.append({"role": "user", "parts": [user_input]})
    history.append({"role": "model", "parts": [model_response]})


""" history=[]
print("JuCCBot: Hello, how can I help you?")

while True:
    user_input=input("You: ")

    chat_session = model.start_chat(
    history=history
    )
    response = chat_session.send_message(user_input)
    model_response=response.text
    print(f'JuCCBot: {model_response}')
    print()

    history.append({"role":"user","parts":[user_input]})
    history.append({"role":"model","parts":[model_response]})
    """