const roles = require('../../enum/roles');
const adminPolicy = require('./adminPolicy');
const superAdmin = require('./superAdmin');
const userPolicy = require('./userPolicy');

const opts = {
    [roles.SUPERADMIN]:{can : superAdmin},
    [roles.ADMIN]:{can : adminPolicy},
    [roles.USER]:{can:userPolicy},
}
module.exports=opts