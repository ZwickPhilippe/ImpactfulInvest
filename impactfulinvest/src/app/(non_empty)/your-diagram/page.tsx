"use client";
import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
  RefAttributes,
} from "react";
import {
Button,
  Chip,
  Flex,
  Text,
  List,
  Title,
  NumberInput,
  Grid,
  Divider,
  Paper,
} from "@mantine/core";
import { RadarChart } from "@mantine/charts";
import classes from "./your-diagram.module.css";


export default function Page() {
  //   const ref = useRef<HTMLDivElement>(null);
  //   const [chartWidth, setChartWidth] = useState(600);
  //   useEffect(() => {
  //     const resizeObserver = new ResizeObserver(() => {
  //       if (ref.current) {
  //         setChartWidth(ref.current.offsetWidth);
  //       }
  //     });
  //     if (ref.current) {
  //       resizeObserver.observe(ref.current);
  //     }
  //   }, []);

//   onChange={(e) => {
// 	setData((oldData) => {
// 		const newData = [...oldData];
// 		let x = 0;
// 		try {
// 			x = parseInt(e.target.value);
// 		} catch (e) {

// 		}
// 		if (!e.target.value ) {
// 			x = 0;	
// 		}
// 		newData[i] = {key: d.key, value: x};
// 		return newData;
// 	})	
// }} 
const [data, setData] = useState([
    {
      esgclassifier: "Greenhouse Gas Emissions",
      sales: 100,
    },
    {
      esgclassifier: "Environmental",
      sales: 98,
    },
    {
      esgclassifier: "Waste",
      sales: 86,
    },
    {
      esgclassifier: "SDFR scoping",
      sales: 99,
    },
    {
      esgclassifier: "Social",
      sales: 85,
    },
    {
      esgclassifier: "Fossil fuels",
      sales: 65,
    },
    {
      esgclassifier: "Biodiversity",
      sales: 65,
    },
    {
      esgclassifier: "Water",
      sales: 65,
    },
  ]);
  return (
	<>
	<Title order={1} mb="md"> Your preferences</Title>
	<Paper radius="md" withBorder className={classes.card} mt={20}>
	<Grid>
      <Grid.Col span={6}>
        <RadarChart
          h={300}
          data={data}
          dataKey="esgclassifier"
          withPolarRadiusAxis
          series={[{ name: "sales", color: "green.4", opacity: 0.2 }]}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <NumberInput
		size="xs"
		label="Greenhouse Gas Emissions"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "Greenhouse Gas Emissions");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
		<NumberInput
		size="xs"
		label="Environmental"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "Environmental");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
		<NumberInput
		size="xs"
		label="Waste"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "Waste");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
		<NumberInput
		size="xs"
		label="SDFR scoping"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "SDFR scoping");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
      </Grid.Col>
	  <Grid.Col span={3}>
        <NumberInput
		size="xs"
		label="Social"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "Social");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
		<NumberInput
		size="xs"
		label="Fossil fuels"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "Fossil fuels");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
		<NumberInput
		size="xs"
		label="Biodiversity"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "Biodiversity");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
		<NumberInput
		size="xs"
		label="Water"
        min={0}
        max={100}
		onChange={(e) => {
			setData((oldData) => {
				const newData = [...oldData];
				let x = e;
				const indexToUpdate = newData.findIndex(obj => obj.esgclassifier === "Water");
				newData[indexToUpdate].sales = parseInt(e+"")
				return newData;
			})	
		}} 
        />
		
      </Grid.Col>
    </Grid>
	</Paper>
    
	</>
  );
}
