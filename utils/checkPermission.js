import { UnAuthenticatedError } from "../errors/index.js";

const checkPermission = (requestedUser, createdById) => {
  //in future if we want to set an admin in that case admin will have complete access over data
  // if(requestedUser.role === 'admin') return

  //remember createdBy is an objectId type but userid is an string that's why we are converting them first in same type
  if (requestedUser.userId === createdById.toString()) return;

  throw new UnAuthenticatedError("You do not have access for this operation.");
};

export default checkPermission;
