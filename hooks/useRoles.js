import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { useAccount } from "../hooks/useAccount";
import { useEthers } from "../hooks/useEthers";

const hasRole = async (contracts, account, role) => {
  const roleId = await contracts.nft[role]();
  const hasRole = await contracts.nft.hasRole(roleId, account);
  return hasRole;
};

const init = {};

export const useRolesImpl = (defaultValue = init) => {
  const [roles, setRoles] = useState(defaultValue);
  const account = useAccount();
  const [, , contracts] = useEthers();

  useEffect(() => {
    if (contracts == null || account == null) return;

    hasRole(contracts, account, "MINTER_ROLE").then((MINTER_ROLE) => {
      setRoles((roles) => ({ ...roles, MINTER_ROLE }));
    });
  }, [account, contracts]);

  return roles;
};

export const useRoles = singletonHook(init, useRolesImpl);
