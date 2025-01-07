import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Stack, Card, CardContent } from '@mui/material';

// API imports
import { GetRadarChartData, GetCapProg, testerPercentAndOsaScoreHistogram } from 'api';
import { getInsightsKPI } from '../../api/Tira/InsightsPage';

// Project imports
import BrandChartData from './chart/brand-chart';
import { gridSpacing } from 'config.js';
import AnomaliesBarChart from './AnomaliesBarChart';
import PoPScoreKPICard from './PoPScoreKPICard';
import AnomalyKPICard from './AnomalyKPICard';
import OSAkpiPop from './OSAkpiPop';
import TesterPercentKpiCard from './TesterPercentKpiCard';

// Components
import HistogramChart from './components/HistogramChart';
import ExceptionsDonut from './components/ExceptionsDonut';
import CaptureProgressSection from './components/CaptureProgressSection';
import AnomaliesSummaryCard from './components/AnomaliesSummaryCard';

const Insights = () => {
  const toLocalDateString = useCallback((date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
  }, []);

  const selectedDateState = useSelector((state) => state.customization.selectedDate);
  const selectedDate = toLocalDateString(selectedDateState.start_date);
  const start_date = toLocalDateString(selectedDateState.start_date);
  const end_date = toLocalDateString(selectedDateState.end_date);
  const userId = useMemo(() => JSON.parse(localStorage.getItem('userData'))?.data[0]?._id, []);

  // State
  const [seriesData, setSeriesData] = useState([]);
  const [capProgress, setCapProgress] = useState(false);
  const [avgCapProgress, setAvgCapProgress] = useState(false);
  const [brandChartOptions, setBrandChartOptions] = useState(BrandChartData.options);
  const [brandFullness, setBrandFullness] = useState(false);
  const [barChartData, setBarChartData] = useState(false);
  const [osascorehistogram, setOsaScoreHistogram] = useState(true);
  const [testerpercenthistogram, setTesterPercentHistogram] = useState(false);
  const [dropdown, setDropdown] = useState('Osa Score');
  const [kpiData, setKpiData] = useState(null);
  const [prevKpiData, setPrevKpiData] = useState(null);
  const [kpiLoading, setKpiLoading] = useState(true);
  const dropdownValue = useSelector((state) => state.customization.selectedRange);

  // Handlers
  const handleclickOnOsa = useCallback(() => {
    if (osascorehistogram) return;
    setTesterPercentHistogram(false);
    setOsaScoreHistogram(true);
  }, [osascorehistogram]);

  const handleclickontester = useCallback(() => {
    if (testerpercenthistogram) return;
    setOsaScoreHistogram(false);
    setTesterPercentHistogram(true);
  }, [testerpercenthistogram]);

  // Data fetching
  const fetchDashboardData = useCallback(async () => {
    try {
      const [brandDonutData, capData, histogramData] = await Promise.all([
        GetRadarChartData({ start_date, end_date, user_id: userId }),
        GetCapProg({ start_date, end_date, user_id: userId }),
        selectedDate && testerPercentAndOsaScoreHistogram({ start_date, end_date, user_id: userId })
      ]);

      // Process brand donut data
      if (brandDonutData?.data?.length > 0) {
        const extractedFullness = brandDonutData.data.map((item) => [item.missing_tester, item.empty_tray, item.correct]);
        setBrandChartOptions((prev) => ({
          ...prev,
          labels: ['Missing tester', 'Empty Shelf', 'Correct']
        }));
        setBrandFullness(extractedFullness);
      } else {
        setBrandFullness([]);
      }

      // Process capture progress data
      if (capData?.data?.results?.length > 0) {
        setAvgCapProgress(capData.data.avgCaptureProgress);
        setCapProgress(capData.data.results);
      } else {
        setAvgCapProgress('');
        setCapProgress([]);
      }

      // Process histogram data
      if (histogramData) {
        const histogramToShow =
          dropdown === 'Osa Score' ? histogramData.data[0].OSA_Score_histogram : histogramData.data[0].testers_score_histogram;
        setBarChartData(histogramToShow);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, [selectedDate, start_date, end_date, userId, dropdown]);

  const fetchKPIData = useCallback(async () => {
    try {
      setKpiLoading(true);
      const data = await getInsightsKPI({ start_date, end_date });
      setKpiData(data);

      // Only fetch previous data if not in custom range mode
      if (dropdownValue !== 'Custom Range') {
        let prevStartDate, prevEndDate;
        const currentStartDate = new Date(start_date);
        const currentEndDate = new Date(end_date);
        const dayDiff = Math.floor((currentEndDate - currentStartDate) / (1000 * 60 * 60 * 24));

        prevStartDate = new Date(currentStartDate);
        prevEndDate = new Date(currentEndDate);
        prevStartDate.setDate(prevStartDate.getDate() - (dayDiff + 1));
        prevEndDate.setDate(prevEndDate.getDate() - (dayDiff + 1));

        const prevData = await getInsightsKPI({
          start_date: toLocalDateString(prevStartDate),
          end_date: toLocalDateString(prevEndDate)
        });
        setPrevKpiData(prevData);
      } else {
        setPrevKpiData(null);
      }
      setKpiLoading(false);
    } catch (error) {
      console.error('Error fetching KPI data:', error);
      setKpiLoading(false);
    }
    // eslint-disable-next-line
  }, [start_date, end_date, toLocalDateString]);

  // Effects
  useEffect(() => {
    fetchDashboardData();
    fetchKPIData();
  }, [fetchDashboardData, fetchKPIData]);

  useEffect(() => {
    if (barChartData) {
      const allCount = barChartData.map((item) => item.count);
      setSeriesData(allCount);
    }
  }, [barChartData]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sx={{ mb: -1, mt: { xs: 1, sm: 1, md: -1 } }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Insights</Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} sm={6} xs={12}>
            <OSAkpiPop kpiData={kpiData} prevKpiData={prevKpiData} loading={kpiLoading} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TesterPercentKpiCard kpiData={kpiData} prevKpiData={prevKpiData} loading={kpiLoading} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <PoPScoreKPICard />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <AnomalyKPICard kpiData={kpiData} prevKpiData={prevKpiData} loading={kpiLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={9} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={7}>
                <HistogramChart
                  seriesData={seriesData}
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  handleclickOnOsa={handleclickOnOsa}
                  handleclickontester={handleclickontester}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <ExceptionsDonut
                  brandChartOptions={brandChartOptions}
                  brandFullness={brandFullness}
                  chartHeight={BrandChartData.height}
                  chartType={BrandChartData.type}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container paddingTop={3} spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <AnomaliesBarChart selectedDate={selectedDate} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={3} xs={12}>
            <Stack spacing={gridSpacing}>
              <AnomaliesSummaryCard anomaliesLoading={kpiLoading} anoCount={kpiData} />
              <CaptureProgressSection avgCapProgress={avgCapProgress} capProgress={capProgress} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Insights;
