import styles from "@/styles/HomePage.module.css";

export default function HomePage() {

    return (
        <>        
            <h2 className={styles.h2}>Welcome to jobChaser</h2>
            {/* {isAuthorized ? <p className={styles.p}>Click the jobs category to start searching for jobs!</p> : <p className={styles.p}>Sign in to start searching for jobs!</p>} */}
        </>
    )
};
