const {AuthenticationError} = require('apollo-server-express');

const{User}= require('../models');

const {signToken}= require('../utils/auth');

const resolvers={
    Query:{
        me: async(parent,arsg,context)=>{
            if(context.user){
                const userData= await User.findOne({_id:context.user._id}).selext('-__v -password');

                return userData;
            }
            throw new AuthenticationError('you are not Logged In')
        }
    },

    Mutation:{
        addUser:async(parent,{username,email,password})=>{
            const user= await User.create({username,email,password})
            const token= signToken(user);

            return {token,user}
        },

        login: async(parent,{email,password})=>{
            const user= await User.findOne({email})

            if(!user){
                throw new AuthenticationError("In valid User email")
            }

            const checkPassword= await isCorrectPassword(password);

            if(!checkPassword){
                throw new AuthenticationError('Please enter a correct password')
            }

            const token= signToken(user);

            return {token, user}
        }
    }
}