function PokeStats({stats}) {
    return(
        <div>
            {stats?.map(({stat, base_stat}, index) =>(
                <div key={index}>
                    <p>{stat.name}</p>
                    <p>{base_stat} % </p>
                </div>
            ))}
        </div>
    );

}
export default PokeStats;