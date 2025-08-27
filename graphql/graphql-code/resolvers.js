let data = {
  authors: [
    { id: 1, name: "john doe", books: [101, 102] },
    { id: 2, name: "Gracy lee", books: [103] },
  ],
  books: [
    { id: 101, title: "The little johnny", publishedYear: "1998", author: 1 },
    { id: 102, title: "My Village", publishedYear: "2000", author: 1 },
    {
      id: 103,
      title: "Night on the mountains",
      publishedYear: "1923",
      author: 2,
    },
  ],
};

export const resolvers = {
  Book:{
    author:(parent, args, context, info) => {
      return data.authors.find(a => a.id ===parent.author)
    }
  },
  Query: {
    authors: (parent, args, context, info) => {
      return data.authors;
    },
    books: (parent, args, context, info) => {
      return data.books;
    },
  },
  Mutation:{
    addBook:(parent, args, context, info)=>{
      data.books.push({...args, id:data.books.length+1})
    }
  }
};
