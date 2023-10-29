import { Box, List, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ContinueButton } from "../../../components/ContinueButton";
import ProgressOverview from "../../../components/ProgressOverview";
import RNAFilterOptions from "../../../enums/RNAFilterOptions";
import getSavedAndCachedRnas from "../../../utils/cache/getSavedAndCachedRnas";
import addRnaToDownloaded from "../../../utils/cache/addRnaToDownloaded";
import { FilterActionButtons } from "./FilterActionButtons";
import { RnaCard } from "./RnaCard";
import { SearchFilter } from "./SearchFilter";
import { Sort, SortingOptionsEnum } from "./Sort";
import styles from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import useOnlineStatus from "../../../utils/useOnlineStatus";

export const RNAs = () => {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState(RNAFilterOptions.ALL);
  const [allRnas, setAllRnas] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [sortOption, setSortOption] = useState(
    SortingOptionsEnum.DATE_LAST_TO_FIRST
  );
  const isOnline = useOnlineStatus();

  const getRnas = async () => {
    const rnas = await getSavedAndCachedRnas(queryClient);

    setAllRnas(rnas);
  };

  useEffect(() => {
    getRnas();
  }, []);

  const downloadRna = async (rnaId) => {
    if (isOnline) {
      await addRnaToDownloaded(rnaId);
      await getRnas();
    }
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filteredRnas = allRnas.filter((rna) => {
    const matchesActiveFilter =
      activeFilter === RNAFilterOptions.DOWNLOADED ? rna.isDownloaded : true;

    if (!nameFilter) {
      return matchesActiveFilter;
    }

    const matchesNameFilter = rna.communityName
      ?.toLowerCase()
      .includes(nameFilter.toLowerCase());

    return matchesActiveFilter && matchesNameFilter;
  });

  const sortedRnas = [...filteredRnas].sort((a, b) => {
    switch (sortOption) {
      case SortingOptionsEnum.DATE_LAST_TO_FIRST:
        return new Date(a.createdOn) - new Date(b.createdOn);
      case SortingOptionsEnum.DATE_FIRST_TO_LAST:
        return new Date(b.createdOn) - new Date(a.createdOn);
      case SortingOptionsEnum.A_TO_Z:
        return a.communityName.localeCompare(b.communityName);
      case SortingOptionsEnum.Z_TO_A:
        return b.communityName.localeCompare(a.communityName);
      case SortingOptionsEnum.SEVERITY:
        return 0; //TODO: Implement
      case SortingOptionsEnum.EMERGENCY:
        return 0; //TODO: Implement
      default:
        return 0;
    }
  });

  const downloadedRnasAmount = () =>
    allRnas.reduce((sum, rna) => (rna.isDownloaded ? sum + 1 : sum), 0);

  return (
    <Stack spacing={3} sx={styles.rnasPage}>
      <ProgressOverview
        rightColumnAmount={allRnas.length}
        rightColumnCaption="Total RNAs"
        leftColumnAmount={downloadedRnasAmount()}
        leftColumnCaption="RNAs Downloaded"
        isLeftColumnInPercentage={false}
      />
      <FilterActionButtons
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Box sx={styles.filterControlsContainer}>
        <SearchFilter
          placeholder="Search by name"
          onChange={handleNameFilterChange}
          sx={styles.searchFilter}
        />
        <Sort
          currentSort={sortOption}
          onSortChange={setSortOption}
          sx={styles.sort}
        />
      </Box>
      <List sx={styles.rnasList}>
        {sortedRnas.map((rna) => (
          <RnaCard
            rna={rna}
            downloadHandler={() => downloadRna(rna.id)}
            key={rna.id}
          />
        ))}
      </List>
      <ContinueButton link="add" sx={styles.newRnaButton}>
        <Typography>New RNA</Typography>
      </ContinueButton>
    </Stack>
  );
};
