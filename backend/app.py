from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_all_notes, get_note, create_note, update_note, delete_note

app = Flask(__name__)
CORS(app)

@app.route("/api/notes", methods=["GET"])
def notes():
    return jsonify(get_all_notes())

@app.route("/api/note/<int:note_id>", methods=["GET"])
def note(note_id):
    return jsonify(get_note(note_id))

@app.route("/api/note", methods=["POST"])
def new_note():
    data = request.json
    folder = data.get("folder", "")  # берём папку, если есть
    return jsonify(create_note(data["title"], data["content"], folder))

@app.route("/api/note/<int:note_id>", methods=["PUT"])
def edit_note(note_id):
    data = request.json
    folder = data.get("folder", "")
    return jsonify(update_note(note_id, data["title"], data["content"], folder))

@app.route("/api/note/<int:note_id>", methods=["DELETE"])
def remove_note(note_id):
    return jsonify(delete_note(note_id))

if __name__ == "__main__":
    app.run(debug=True)
