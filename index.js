const express = require('express')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
const port = 3000

const items = [
    {name: "eat", isDone: true, id: 1},
    {name: "sleep", isDone: false, id: 2},
    {name: "hit doudou", isDone: true, id: 3}
];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//"/"后面是地址
app.get('/hello', (req, res) => {
    res.send('你好呀')
  })

//根据是否完成了返回items localhost：3000/items?done=true
app.get('/items', (req,res) => {
  const done = req.query.done
  const isDone = done === "true"

  //如果没有搜索
  if(!done) {
    return res.send(items)
  }

  let result = items.filter((item)=>item.isDone === isDone)
  res.send(result)
})

app.get('/items', (req, res) => {
    res.send(items)
  })

// 根据id获取某一个item localhost:3000/items/1
app.get('/items/:itemId', (req, res) => {
    const itemId = parseInt(req.params.itemId, 10)
    const item =items.find((item) => item.id === itemId)
    if (!item) {
      res.send("didn't find")
    }
    res.send(item)
  })

app.post("/items", (req,res) => {
  //拿到数据
  const item = req.body
  //操作数据
  item.isDone = false
  item.id = items.length + 1
  //储存数据
  items.push(item)
  res.sendStatus(201)
})

app.patch("/items/:itemId", (req,res) => {
  //找到item
  const itemId = parseInt(req.params.itemId, 10)
  // const item =items.find((item) => item.id === itemId)
  const itemIndex = items.findIndex((item) => item.id === itemId)
  console.log(itemIndex)
  if (itemIndex === -1) {
      res.sendStatus(404)
    }
  // 修改item
  // const obj1 = {a:123, b:321};
  // const obj2 = {a:567, c:"ccc"};
  // const obj3 = {
  //   ...obj1,
  //   ...obj2
  // }
  // { a: 567, b: 321, c: 'ccc' }
  


  items[itemIndex] = {
    ...items[itemIndex],
    ...req.body
  }

  console.log(req.body)
  res.sendStatus(200)
})

app.delete("/items/:itemId", (req,res) => {
  //找到item
  const itemId = parseInt(req.params.itemId, 10)
  // const item =items.find((item) => item.id === itemId)
  const itemIndex = items.findIndex((item) => item.id === itemId)
  console.log(itemIndex)
  if (itemIndex === -1) {
      return res.sendStatus(404)
  }

  items.splice(itemIndex, 1)
  res.sendStatus(301)
})

const serverStartCallBack = () => {
    console.log(`Example app listening on port ${port}`)
}

app.listen(port, serverStartCallBack)