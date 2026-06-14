export const OnboardProceed = async (data) => {
  const { userId, roles, storeName, storeType, storeAddress } = data;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/assign-role`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          roles,
          storeName,
          storeType,
          storeAddress,
        }),
        credentials: "include",
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
