from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def test():
    print("test")
    return "플라스크 테스트"


@app.route("/payment", methods=["GET", "POST"])
def payment():
    print("hi")
    pay = request.get_json()
    print(pay)
    result = pay["age"] + pay["count"] * 2
    print(result)
    return str(result)


if __name__ == "__main__":
    app.run(debug=True)
