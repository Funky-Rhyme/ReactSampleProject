import "antd/dist/antd.css";
import "./index.css";
import { Spin , Divider, Card, Result} from "antd";
import { useEffect, useState } from "react";
import { Data } from "./UsersGrid";


interface Posts {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export default function UserPosts({ user }: { user: Data }) {
  const url: string = "https://gorest.co.in/public/v1/posts";

  const [data, setData] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  let postsArr: Posts[] | any = [];

  useEffect(() => {
    const fetchData = async (url: string) => {
      let i: number = 0;
      let data: Posts[] | any = [];

      do {
        const res = await fetch(url);
        const json = await res.json();

        data.push(json.data);

        url = json.meta.pagination.links.next;
        i++;
        console.log(data);
      } while (i < 2);

      return data.flat();
    };
    fetchData(url)
      .then(setData)
      .finally(() => setHasLoaded(true));
  }, [url]);

  if (hasLoaded === false) {
    return <Spin />;
  } else {
    let a = user.id;
    postsArr = data.filter((el: any) => el.user_id === a);

    console.log(data);
    console.log(user);
    console.log(postsArr);

    if (postsArr.length) {
      return (
        <div>
          <h1>Посты {user.name}</h1>
          <>
            {postsArr.map((el: Posts) => (
              <Card title={el.title} style={{width: 600}}>
                <p>{el.body}</p>
                <Divider/>
              </Card>
            ))}
          </>
        </div>
      );
    }

    return (
      <Result title={"У пользователя "+ user.name +" нет постов :("}/>
    );
  }
}
