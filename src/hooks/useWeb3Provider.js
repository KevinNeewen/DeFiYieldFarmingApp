import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

const useWeb3Provider = () => {
  const [web3Provider, setWeb3Provider] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      const provider = await detectEthereumProvider();
      setWeb3Provider(provider);
    };

    loadWeb3();
  }, []);

  return {
    hasEthereumProvider: web3Provider !== null,
  };
};

export default useWeb3Provider;
