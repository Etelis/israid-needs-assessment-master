import { useState } from "react";
import { Stack, Typography, List } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/axios";
import RNAFilterOptions from "../../enums/RNAFilterOptions";
import { ContinueButton } from "../../components/ContinueButton";
import ProgressOverview from "../../components/ProgressOverview";
import { ProgressCard } from "./ProgressCard";
import { FilterActionButtons } from "./FilterActionButtons";
import { SearchFilter } from "./SearchFilter";
import styles from "./styles";

export const RNAs = () => {
  const [activeFilter, setActiveFilter] = useState(RNAFilterOptions.ALL);
  const [nameFilter, setNameFilter] = useState("");

  const { data: rnas = [], isLoading } = useQuery(
    ["rnas"],
    async () => (await api.get("/rnas")).data,
    { refetchOnWindowFocus: false }
  );

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filteredRnas = rnas.filter((rna) => {
    const matchesActiveFilter =
      activeFilter === RNAFilterOptions.ONGOING ? !rna.isCompleted : true;

    if (!nameFilter) {
      return matchesActiveFilter;
    }

    const matchesNameFilter = rna?.communityName
      ?.toLowerCase()
      .includes(nameFilter.toLowerCase());

    return matchesActiveFilter && matchesNameFilter;
  });

  return (
    <Stack spacing={3} sx={styles.rnasPage} alignItems="center">
      <ProgressOverview
        rightColumnAmount={8512}
        rightColumnCaption="Questions Answered"
        leftColumnAmount={3}
        leftColumnCaption="RNAs Filled"
        isLeftColumnInPercentage={false}
      />
      <FilterActionButtons setActiveFilter={setActiveFilter} />
      <SearchFilter
        placeholder="Search by name"
        onChange={handleNameFilterChange}
      />
      <List sx={styles.rnasList}>
        {!isLoading &&
          filteredRnas.map(
            ({ id, lastSyncDate, creationDate, communityName }) => (
              <ProgressCard
                sx={styles.rna}
                value={Math.floor(Math.random() * 101)} // TODO: evaluate % based on number of questions answered
                key={id}
                lastSyncDate={new Date(
                  lastSyncDate ?? creationDate
                ).toLocaleDateString("en-US")}
                communityName={communityName}
                route={id}
              />
            )
          )}
      </List>
      <ContinueButton link="add" sx={styles.newRnaButton}>
        <Typography>New RNA</Typography>
      </ContinueButton>
    </Stack>
  );
};