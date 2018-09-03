const request = require('koa2-request');

const roles = async (user_id) => {
  if (!user_id) throw new Error('no user_id');

  const response1 = await request(`http://172.20.110.42:10010/user/get/${user_id}`);
  const result1 = JSON.parse(response1.body);
  const user = result1.data;
  if (!user) throw new Error(`没有用户『${user_id}』的信息。`);

  const response2 = await request(`https://authority.tap4fun.com/users/authorize?email=${user.email}&partition_alias=bonus`);
  const authority = JSON.parse(response2.body);
  if (authority.id === null || authority.id === undefined) { throw new Error(`权限系统没有『${user.email}』的信息。`); }
  return authority.roles;
};
module.exports = {
  roles
}
