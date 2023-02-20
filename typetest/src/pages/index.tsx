import { type NextPage } from "next";
import { useMemo, useState } from "react";
import { z } from "zod";

const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
});

function useQuery______SIIIKE() {
  return {
    data: JSON.parse(JSON.stringify({
      id: "1",
      name: "John Doe",
      // ... other fields
    })) as unknown,
    isLoading: false
  };
}

const Home: NextPage = () => {
  const { data } = useQuery______SIIIKE();
  const customerData = useMemo(() =>
      customerSchema.parse(data) || null,
    [data]);

  const [customer, setCustomer] = useState(customerData);

  const handleUpdate = (partialCustomer: Partial<typeof customerData>) => {
    setCustomer({ ...customer, ...partialCustomer })
  };
  
  return (
    <div>
      <button onClick={() => handleUpdate({ name: "Jane Doe" })}>
        Set name to Jane Doe
      </button>
      <div>
        {customer?.name === "Jane Doe" ? "wow you did it!" : "try again"}
      </div>
    </div>
  )
};

export default Home;
