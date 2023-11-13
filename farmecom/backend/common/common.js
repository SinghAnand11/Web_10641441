exports.sanitizeUser=(user)=>{
    return {_id:user._id,role:user.role}
}