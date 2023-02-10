const {AuthenticationError} = require('apollo-server-express');

const{User}= require('../models');

const {signToken}= require('../utils/auth');

const resolvers={
    Query{
        me: async(parent,arsg,context)=>{
            if(context.user){
                const userData= await User.findOne({_id:context.user._id}).selext('-__v -password');

                return userData;
            }
            throw new AuthenticationError('you are not Logged In')
        }
    }
}