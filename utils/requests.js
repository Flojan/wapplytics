export const getData = async (props) => {
  const res = await fetch(`/api/data/${props.website_id}/${props.user_id}/${props.tile}/${props.indicator}/calculate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const getWebsites = async (props) => {
  const res = await fetch(`/api/website/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const createWebsite = async (props) => {
  const res = await fetch("/api/website/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ website_url: props.website_url, website_name: props.website_name }),
  });
  return await res.json();
};

export const getUsers = async (props) => {
  const res = await fetch(`/api/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const createUser = async (props) => {
  const res = await fetch("/api/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: props.username, password: props.password, admin: props.admin }),
  });
  return await res.json();
};

export const updateUser = async (props) => {
  const res = await fetch("/api/user/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: props }),
  });
  return await res.json();
};
