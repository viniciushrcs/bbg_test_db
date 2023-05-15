import {ApolloServer} from 'apollo-server';
import mongoose from 'mongoose';
import {typeDefs} from "./types";

mongoose.connect('mongodb+srv://viniciushrcs:m8atmovRfbtRgUDx@cluster0.c2x6jb9.mongodb.net/test');

const boogerSkinSchema = new mongoose.Schema({
  nftId: String,
  runeInternalName: String,
});

const skillSchema = new mongoose.Schema({
  slot: Number,
  internalName: String,
  runeInternalName: String,
});

const equipmentSchema = new mongoose.Schema({
  internalName: String,
  nftId: String,
  level: Number,
});

const userSchema =  new mongoose.Schema({
  email: String,
  pwd: String,
  walletAddress: String,
  lastLogin: String,
  energyLastRecharge: String,
  energyQuantity: Number,
  bbgc: Number,
  Booger: {
    nftId: String,
    boogerSkin: boogerSkinSchema,
    skill: skillSchema,
    equipment: [equipmentSchema],
  },
});

const resolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      const UserModel = mongoose.model('User', userSchema);
      return UserModel.findById(id);
    },
  },
  Mutation: {
    addUser: async (_: any, { user }: { user: any }) => {
      const UserModel = mongoose.model('User', userSchema);
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    },
  },
};

// Criando o servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Iniciando o servidor Apollo
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
