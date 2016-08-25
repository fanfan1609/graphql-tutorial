var graphql 	= require('graphql');
var graphqlHttp = require('express-graphql');
var express 	= require('express');

// Import data
var data = require('./data.json');

// Define User type
var userType = new graphql.GraphQLObjectType({
	name: 'User',
	fields: {
		id : { type: graphql.GraphQLString},
		name: { type: graphql.GraphQLString},
	}
});

// Define schema
var schema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
		name: "Query",
		fields: {
			user: {
				type: userType,
				args: {
					id: {type: graphql.GraphQLString}
				},
				resolve: function(_,args){
					return data[args.id];
				}
			},
		}
	})
});

express()
	.use('/graphql', graphqlHttp({schema: schema, pretty: true}))
	.listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');