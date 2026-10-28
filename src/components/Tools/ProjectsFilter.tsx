import React from "react"

type Props = {
    showFilters: boolean,
    data: {},
    filteredData?: CallableFunction
}

const Filters = ({showFilters, data, filteredData}:Props) => {
    const [search, setSearch] = React.useState({
        text_search: '',
        stage: '',
        industry: '',
    })


    const filterData = (search:any) => {
        if (!data || !Array.isArray((data as any))) return;

        const filtered = (data as any).filter((project: any) => {
            const matchesText = search.text_search === '' ||
                (project.name && project.name.toLowerCase().includes(search.text_search.toLowerCase()));
            const matchesStage = search.stage === '' || project.stage.toLowerCase() === search.stage.toLowerCase();
            const matchesIndustry = search.industry === '' || project.industry.toLowerCase() === search.industry.toLowerCase();
            return matchesText && matchesStage && matchesIndustry;
        });

        // You can call a prop function or set a state here to send filtered data to the parent/front end
      filteredData(filtered)
    }
    return(
          <>
            <form
              className="scope"
              onSubmit={(event) => {
                event.preventDefault();
                filterData(search);
              }}
            >
              <label className="scope-lens">
                <input
                  type="search"
                  value={search.text_search}
                  onChange={e => setSearch({ ...search, text_search: e.target.value })}
                  placeholder="Search"
                  aria-label="Search projects"
                />
              </label>
              <button type="submit" className="scope-handle" aria-label="Search">
                <span /><span /><span /><span />
              </button>
            </form>
          </>
    )
}

export default Filters