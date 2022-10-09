import databaseInit from "../../config/database/init";
import {UserRoleEntity} from "../entity/UserRoleEntity";
import {RoleEntity} from "../entity/RoleEntity";

const getRoleNamesByUid = async (uid: string) => {
  const userRoles = await databaseInit.em.find(UserRoleEntity, {userId: uid})
  const rolesId: string[] = [];

  userRoles.map(userRole => rolesId.push(userRole.roleId));

  if (rolesId.length === 0) return [];

  const roles = await databaseInit.em.find(RoleEntity, {id: rolesId})
  const rolesName: string[] = [];

  roles.map(role => rolesName.push(role.name));

  return rolesName;
}

export default {
  getRoleNamesByUid,
}