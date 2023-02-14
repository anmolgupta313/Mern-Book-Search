const {AuthenticationError} = require('apollo-server-express');

const{User}= require('../models');

const {signToken}= require('../utils/auth');

const resolvers={
    Query:{
        me: async(parent,args,context)=>{
            if(context.user){
                const userData= await User.findOne({_id:context.user._id}).select('-__v -password');

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

            const checkPassword= await user.isCorrectPassword(password);

            if(!checkPassword){
                throw new AuthenticationError('Please enter a correct password')
            }

            const token= signToken(user);

            return {token, user}
        },

        saveBook: async(parent,args,context)=>{
            if(context.user){
                const saveBookData= await User.findByIdAndUpdate(
                    {_id:context.user._id},
                    {$push:{savedBooks:args.input}},{new:true, runValidators:true})

                return saveBookData
            }
            throw new AuthenticationError("please log In if u want to save the book")
        },

        removeBook: async(parent,args,context)=>{
            if(context.user){
                const removeBookData= await User.findOneAndUpdate({_id:context.user._id},{$pull:{saveBook:{bookId:args.bookId}}})

                return removeBookData
            }
            throw new AuthenticationError("please log In if u want to remove the book")
        }

    }
}

module.exports= resolvers