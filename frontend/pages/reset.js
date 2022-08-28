import { useRouter } from "next/router";
import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage(props) {
  const { query } = useRouter();
  if (!query?.token) {
    return (
      <div>
        <p>You must supply a token!</p>
        <RequestReset />
      </div>
    );
  }

  return <Reset />;
}
