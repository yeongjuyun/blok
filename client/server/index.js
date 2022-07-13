const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

// Setup logger
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.set("view engine", "tsx");
app.use(express.static(path.resolve(__dirname, "..", "build")));

// Always return the main index.html, so react-router render the route in the client
//   모든 request에 대해서 build폴더 아래 index.html을 보내도록 되어 있는데,
//       이부분을 수정하여 server side 프로그래밍을 한다.

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

app.get("/123", function (req, res) {
  res.send("<h1>welcome page</h1>");
});

app.get("/user", function (req, res) {
  res.send({
    name: "elice",
    email: "elice@elice.com",
    plan: "Free",
    domain: [
      { doname: "naver", link: "http://www.naver.com" },
      { doname: "google", link: "http://www.google.com" },
    ],
  });
});

app.get("/template", function (req, res) {
  res.send({
    template: [
      { title: "랜딩페이지", description: "회사 웹사이트 템플릿 입니다." },
      {
        title: "이력서",
        description: "이력서 템플릿 입니다.",
        color1: "#2B9D67",
        color2: "#CEF0E2",
      },
      {
        title: "기업소개 웹사이트",
        description: "기업소개 템플릿 입니다.",
        color1: "#F5E44C",
        color2: "#CEA9D3",
      },
    ],
  });
});

const userData = {
  data: [
    {
      id: 1,
      template: "랜딩페이지",
      domain: "www.google.com",
      plan: "free",
      startDate: "20220202",
      name: "앨리스",
    },
    {
      id: 2,
      template: "랜딩페이지",
      domain: "www.google.com",
      plan: "free",
      startDate: "20220202",
      name: "윤영주",
    },
    {
      id: 3,
      template: "기업소개",
      domain: "www.naver.com",
      plan: "free",
      startDate: "20220202",
      name: "앨리샤",
    },
    {
      id: 4,
      template: "이력서",
      domain: "www.naver.com",
      plan: "free",
      startDate: "20220202",
      name: "윤영미",
    },
    {
      id: 5,
      template: "기업소개",
      domain: "www.naver.com",
      plan: "free",
      startDate: "20220202",
      name: "윤영수",
    },
    {
      id: 6,
      template: "이력서",
      domain: "www.naver.com",
      plan: "free",
      startDate: "20220202",
      name: "이아영",
    },
    {
      id: 7,
      template: "기업소개",
      domain: "www.naver.com",
      plan: "free",
      startDate: "20220202",
      name: "이아영",
    },
    {
      id: 8,
      template: "메롱",
      domain: "www.naver.com",
      plan: "free",
      startDate: "20220202",
      name: "윤영수",
    },
    {
      id: 9,
      template: "이력서",
      domain: "www.naver.com",
      plan: "free",
      startDate: "20220202",
      name: "김민수",
    },
    {
      id: 10,
      template: "메롱",
      domain: "www.google.com",
      plan: "free",
      startDate: "20220202",
      name: "윤영주",
    },
    {
      id: 11,
      template: "이력서",
      domain: "www.block.com",
      plan: "free",
      startDate: "20220202",
      name: "윤영수",
    },
  ],
};

app.get("/users", function (req, res) {
  const { q } = req.query;

  const keys = ["name", "template", "domain", "plan", "startDate"];

  const search = (data) => {
    return data.filter((item) => keys.some((key) => item[key].includes(q)));
  };

  res.send(search(userData.data).splice(0, 8));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
