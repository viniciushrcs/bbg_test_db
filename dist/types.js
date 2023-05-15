"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
    type User {
        _id: ID!
        email: String!
        pwd: String!
        walletAddress: String
        lastLogin: String
        energyLastRecharge: String
        energyQuantity: Int
        bbgc: Float
        item: [Item]
        recipe: [Recipe]
        boogerSkin: [BoogerSkin]
        Booger: ID!
    }
    
    type Item {
        _id: ID!
        internalName: String
        quantity: Int
        visible: Boolean
    }
    
    type Recipe {
        _id: ID!
        internalName: String
    }
    
    
    type Booger {
        _id: ID!
        nftId: String
        boogerSkin: BoogerSkin
        skill: [Skill]
        equipment: [Equipment]
    }

    type BoogerSkin {
        _id: ID!
        nftId: String
        runeInternalName: String
    }

    type Skill {
        _id: ID!
        slot: Int
        internalName: String
        runeInternalName: String
    }

    type Equipment {
        _id: ID!
        internalName: String
        nftId: String
        level: Int
    }

    input BoogerInput {
        nftId: String
        boogerSkin: BoogerSkinInput
        skill: [SkillInput]
        equipment: [EquipmentInput]
    }

    input BoogerSkinInput {
        nftId: String
        runeInternalName: String
    }

    input SkillInput {
        slot: Int
        internalName: String
        runeInternalName: String
    }

    input EquipmentInput {
        internalName: String
        nftId: String
        level: Int
    }

    input UserInput {
        email: String!
        pwd: String!
        walletAddress: String
        lastLogin: String
        energyLastRecharge: String
        energyQuantity: Int
        bbgc: Float
        Booger: BoogerInput
    }


    type Mutation {
        addUser(user: UserInput): User
    }
    
    type Query {
        getUser(id: ID!): User
    }
`;
