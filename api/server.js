"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("./types");
mongoose_1.default.connect('mongodb+srv://viniciushrcs:m8atmovRfbtRgUDx@cluster0.c2x6jb9.mongodb.net/test');
const boogerSkinSchema = new mongoose_1.default.Schema({
    nftId: String,
    runeInternalName: String,
});
const skillSchema = new mongoose_1.default.Schema({
    slot: Number,
    internalName: String,
    runeInternalName: String,
});
const equipmentSchema = new mongoose_1.default.Schema({
    internalName: String,
    nftId: String,
    level: Number,
});
const userSchema = new mongoose_1.default.Schema({
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
        getUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const UserModel = mongoose_1.default.model('User', userSchema);
            return UserModel.findById(id);
        }),
    },
    Mutation: {
        addUser: (_, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            const UserModel = mongoose_1.default.model('User', userSchema);
            const newUser = new UserModel(user);
            yield newUser.save();
            return newUser;
        }),
    },
};
// Criando o servidor Apollo
const server = new apollo_server_1.ApolloServer({ typeDefs: types_1.typeDefs, resolvers });
// Iniciando o servidor Apollo
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
