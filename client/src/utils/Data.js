// Producer
// _id: number
// name: String
// user: user
// beats: beat[]
// licenses: license[]

// beat
// _id: number
// title: String
// filename: String  // "cc48fa3087f9a8278a38dd951b1b7105.mp3")

// license
// _id: number
// name: String
// text: String
// price: number

const customers = [
  {
    _id: 1,
    email: "customer@checkout.com",
    firstName: "Harry",
    lastName: "Toes"
  },
  {
    _id: 2,
    email: "customer@buy.com",
    firstName: "Justin",
    lastName: "Case"
  }
];
const users = [
  {
    _id: 1,
    created: "2020-02-28T19:50:16.547Z",
    email: "producer1@site.com",
    __v: 0
  },
  {
    _id: 2,
    created: "2020-02-28T19:50:16.547Z",
    email: "producer2@site.com",
    __v: 0
  },
  {
    _id: 3,
    created: "2020-02-28T19:50:16.547Z",
    email: "producer3@site.com",
    __v: 0
  }
];
const licenses = [
  { _id: 1, name: "Basic", text: "1000 streams", price: 29.99 },
  { _id: 2, name: "Premium", text: "10000 streams", price: 59.99 },
  { _id: 3, name: "Exclusive", text: "100000 streams", price: 499.99 },

  { _id: 4, name: "Cool", text: "999 streams", price: 39.99 },
  { _id: 5, name: "Super", text: "9999 streams", price: 69.99 },
  { _id: 6, name: "Duper", text: "99999 streams", price: 399.99 },

  { _id: 7, name: "Basic", text: "2000 streams", price: 27.99 },
  { _id: 8, name: "Premium", text: "20000 streams", price: 57.99 },
  { _id: 9, name: "Exclusive", text: "200000 streams", price: 477.99 }
];
const beats = [
  {
    _id: 1,
    title: "abc",
    file: "/api/audio/cc48fa3087f9a8278a38dd951b1b7105.mp3"
  },
  {
    _id: 2,
    title: "def",
    file: ""
  },
  {
    _id: 3,
    title: "ghi",
    file: ""
  },

  {
    _id: 4,
    title: "zyx",
    file: ""
  },
  {
    _id: 5,
    title: "wvu",
    file: ""
  },

  {
    _id: 6,
    title: "tsr",
    file: ""
  },
  {
    _id: 7,
    title: "qpo",
    file: ""
  },
  {
    _id: 8,
    title: "nml",
    file: ""
  }
];

const producers = [
  {
    _id: 1,
    name: "producer1",
    user: 1,
    beats: [beats[0], beats[1], beats[2]],
    licenses: [licenses[0], licenses[1], licenses[2]]
  },
  {
    _id: 2,
    name: "producer2",
    user: 2,
    beats: [beats[3], beats[4]],
    licenses: [licenses[3], licenses[4], licenses[5]]
  },
  {
    _id: 3,
    name: "producer3",
    user: 3,
    beats: [beats[5], beats[6], beats[7]],
    licenses: [licenses[6], licenses[7], licenses[8]]
  }
];

module.exports = { users, licenses, beats, producers, customers };
