import "antd/dist/antd.css";
import "./index.css";
import { Table, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserPosts from "./UserPosts";

export interface Data {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default function UsersGrid() {
  

  let currentUser: Data[] | any;
  const [data, setData] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [user, setUser] = useState<Data>()

  const url: string = "https://gorest.co.in/public/v1/users";

  useEffect(() => {
    const fetchData = async (url: string) => {
      let data: Data[] | any = [];
      let i: number = 0;

      do {
        const res = await fetch(url);
        const json = await res.json();

        data.push(json.data);

        url = json.meta.pagination.links.next;
        i++;
      } while (i < 2);

      setHasLoaded(true);
      return data.flat();
    };
    fetchData(url).then(setData);
  }, [url]);



  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      render: (text: string) => (
        <Link
          to={"/users/posts/" + text}
          onClick={() => {
            console.log(data);
            currentUser = 
              data.find(
                (el: Data) =>
                  el.name === text
              );
              console.log(currentUser.id);
              setUser(currentUser);
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      key: "2",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "status",
    },
  ];

  if (hasLoaded === false) {
    return (
      <div className="centerDiv">
        <Spin />
      </div>
    );
  }
  if (user) {
    return <UserPosts user={user} />;
  } else {
    return (
      <div className="centerDiv">
        <Table columns={columns} dataSource={data} scroll={{ y: 500 }} />
      </div>
    );
  }
}
