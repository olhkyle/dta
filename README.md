# 🏢 D\*T.A(Document Tax Administration)

### 01 Background

A company in the **Construction Industry** is still manually managing data related to **payment of wages** to day-laborers in the field.

The company realized that the time cost of sifting through the data needed to calculate taxes and the human cost of managing the data was
being unnecessarily wasted.

In order to reduce the unnecessary waste of time, space, and human resources, we decided to focus on the work efficiency of data managers
and organize related WebApp.

<br/>

### 02 Goal

1. Configure the system as a company's internal system that only relevant people can use.

   - It is a system that contains personal information and cannot be signed up from outside, and only relevant people can log in, and strong
     rules regarding security are applied.

2. Describe the **personal information, date of work, wages paid, remittance details, business number, and work-related contents** to be
   paid to the laborers for each day's work and store them in the DB.
3. Visualize **per month** based on data such as how many day-laborers worked, how much wages were paid, etc.

   - `chart.js` is utilized.
   - In the Monthly Overview, and within the route for Laborer Detailed View, you can view charts based on the relevant data for each
     Laborer.

4. Provide a dashboard showing yearly labor costs and the number of laborers, with visualized data (chart) and detailed list.

5. To handle **Taxation** related tasks, configure the function so that the printout that was previously exported from Excel or Hangul can
   be **printed** from the web app.

> For security, all UIs cannot be displayed

<br/>

### 03 Progress

> ☑︎ 90% / 100% (keep developing and refactoring)

<br/>

### 04 Tech Stacks

`React` `TypeScript` `React-Query` `Redux-Toolkit` `Zod` `React-Hook-Form` `Emotion` `Chart.js` `Firebase`
