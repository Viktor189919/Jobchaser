"use client"

import styles from "@/components/Searchbar/Searchbar.module.css"

import { SearchbarProps } from  "@/types/searchbarTypes"

export default function Searchbar({ inputValue, searchFunc, filterFunc } : SearchbarProps) {

    return  (
        <div className={styles.searchbarContainer}>
                <p className={styles.searchHeader}>Search jobs</p>
                <input className={styles.input}
                    type="text" 
                    value={inputValue}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => searchFunc(e)}
                    placeholder="Ex. React..." 
                />
                <div className={styles.btnContainer}>
                    <button className={styles.btn} onClick={() => filterFunc("react")}>React</button>
                    <button className={styles.btn} onClick={() => filterFunc("vue")}>Vue</button>
                    <button className={styles.btn} onClick={() => filterFunc("angular")}>Angular</button>
                    <button className={styles.btn} onClick={() => filterFunc("all")}>Show all</button>
                </div>
        </div>
    )
}