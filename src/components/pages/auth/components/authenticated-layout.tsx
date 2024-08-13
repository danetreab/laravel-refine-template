import { Flex, Image } from "antd";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Header } from "@/components";
import {ThemedSiderV2} from "@/components/layout/sider";

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => (
    <ThemedLayoutV2
        // Title={() => (
        //     <Flex>
        //         <Image
        //             preview={false}
        //             style={{ background: "white", borderRadius: "100%" }}
        //             src={logo}
        //             width={60}
        //         />
        //     </Flex>
        // )}
        Header={() => <Header />}
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
    >
        {children}
    </ThemedLayoutV2>
);