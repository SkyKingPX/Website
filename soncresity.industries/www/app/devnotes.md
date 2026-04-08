# How to add correct padding to pages
Use This preset:
```jsx
<PageWrapper backgroundInterval={30000}>
  <main className="min-h-dvh flex flex-col">
    <Header />

    <div className="flex-1 pt-header relative">
      <YourSectionHere />

      <div className="h-[var(--header-h)]" /> // Only use this if your page is smaller than the screen on desktop. Otherwise remove it
    </div>

    <Footer />
  </main>
</PageWrapper>
```