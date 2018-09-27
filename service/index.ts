import express from "express"
import graphqlHTTP from "express-graphql"
import { buildSchema } from "graphql"

const schema = buildSchema(`
	enum Universe {
		WARCRAFT
		OVERWATCH
		DIABLO
	}

	type Character {
		id: String
		name: String
		universe: Universe
	}

	type Query {
		char(id: String): Character
	}
`)

const db = {
	"0": {
		id: "0",
		name: "Thrall",
		universe: "WARCRAFT"
	}
}

const rootValue = {
	char: (ob: any) => {
		if (ob.id === undefined) {
			return db
		}
		console.log(ob);
		console.log((db as any)[ob.id]);
		return (db as any)[ob.id]
	}
}

const app = express()
app.use("/graphql", graphqlHTTP({ schema, rootValue, graphiql: true }))
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"))