import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { permissions } from "../access";
import { permissionFields } from "./fields";

export const Role = list({
  access: {
    create: permissions.canManageOrders,
    read: permissions.canManageOrders,
    update: permissions.canManageOrders,
    delete: permissions.canManageOrders,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: "User.role",
      many: true,
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
  },
});
