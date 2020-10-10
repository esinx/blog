<style lang="scss">
  @media only print {
    :global(nav) {
      display: none;
    }
    :global(main) {
      max-width: unset;
      padding: unset;
    }
  }

  .social {
    text-align: right;
    .social-item {
      display: inline-block;
      border-right: solid #777 1px;
      padding-right: 5px;
    }
  }

  h1 {
    margin: 0;
  }
  p {
    margin: 0;
    color: #777;
  }

  section {
    h2 {
      background: black;
      color: white;
      padding: 5px;
      margin-top: 10px;
    }
    h3 {
      margin: 0;
      margin-top: 10px;
      margin-bottom: 3px;
    }
    .timeline {
      display: grid;
      grid-template-columns: 120px 1fr;
      .left {
        font-weight: bold;
        justify-self: flex-end;
        padding-right: 10px;
      }
    }
  }
</style>

<svelte:head>
  <title>résumé</title>
</svelte:head>

<div class="root">
  <p>Résumé</p>
  <h1>Eunsoo Shin</h1>

  <p>South Korean. I do fullstack web development and iOS security research.</p>
  <p>alias: esinx, c0ldra1n</p>

  <div class="social">
    <div class="social-item">github: @esinx</div>
    <div class="social-item">twitter: @e_sinx</div>
  </div>

  <section id="skills">
    <h2>Skills</h2>
    <h3>Web</h3>
    <div class="timeline">
      <div class="left">[2019~]</div>
      <div class="content">Svelte</div>
      <div class="left">[2018~]</div>
      <div class="content">GraphQL on server &amp; client</div>
      <div class="left">[2017~]</div>
      <div class="content">React</div>
      <div class="left">[2015~]</div>
      <div class="content">NodeJS and server-side JavaScript</div>
      <div class="left">[2014~]</div>
      <div class="content">PHP</div>
      <div class="left">[2013~]</div>
      <div class="content">Vanilla Web Development(HTML, CSS, JavaScript)</div>
      <div class="left">Also</div>
      <div class="content">
        Recoil, socket.io, Sass, NextJS, Sapper, PWA implementation, PDF
        manipulation, electron, weird HTML printing tricks
      </div>
    </div>
    <h3>Apple</h3>
    <div class="timeline">
      <div class="left">[2017~]</div>
      <div class="content">iOS Tweak Development</div>
      <div class="left">[2017~]</div>
      <div class="content">iOS Reverse Engineering</div>
      <div class="left">[2014~]</div>
      <div class="content">iOS App Development</div>
      <div class="left">[2014~]</div>
      <div class="content">macOS(OS X) App Development</div>
    </div>
    <h3>Other Proficient Skills</h3>
    <div class="timeline">
      <div class="left">[2020~]</div>
      <div class="content">OCaml</div>
      <div class="left">[2020~]</div>
      <div class="content">React Native</div>
      <div class="left">[2020~]</div>
      <div class="content">Flutter</div>
      <div class="left">[2018~]</div>
      <div class="content">Python</div>
      <div class="left">[2017~]</div>
      <div class="content">Java</div>
      <div class="left">Also</div>
      <div class="content">
        Regex, Deployment using Docker, GitHub Actions, GitLab CI/CD, exiting
        vim
      </div>
    </div>
  </section>

  <section id="projects">
    <h2>Projects</h2>
    <div class="timeline">
      <div class="left">[2020~]</div>
      <div class="content">staccato: music review site</div>
      <div class="left">[2020]</div>
      <div class="content">
        jjin-age.me: An interactive survey guessing your body age based on daily
        habits
      </div>
      <div class="left">[2019]</div>
      <div class="content">PrepCSIA: Learning platform for CSIA students</div>
      <div class="left">[2018~]</div>
      <div class="content">Alim: An open source media downloader/tagger</div>
      <div class="left">[2017~2019]</div>
      <div class="content">
        iOS Tweak development
        <div class="timeline">
          <div class="left">Shydock</div>
          <div class="content">
            10,000≤ downloads: Dock hiding tweak with custom action assignment
            options
          </div>
          <div class="left">CasualAlarm</div>
          <div class="content">
            2,000≤ downloads: Alarm app to play random songs from music library
          </div>
          <div class="left">Photicon</div>
          <div class="content">
            8,000≤ downloads: Photos app icon to display most recent photo
          </div>
          <div class="left">Quickify</div>
          <div class="content">
            10,000≤ downloads: Quick Spotify playlist control from lock screen
            and control center
          </div>
          <div class="left">ReachBoard</div>
          <div class="content">
            8,000≤ downloads: Quick access to clipboard using reachability view
          </div>
          <div class="left">Mitsuha</div>
          <div class="content">
            80,000≤ downloads: Jell-o effect audio visualizer for stock music
            app. Open-sourced and continued by the developer community
          </div>
          <div class="left">GeniusHelper</div>
          <div class="content">
            2,000≤ downloads: Utility for troubleshooting jailbreak related
            issues on reddit’s r/jailbreak community
          </div>
          <div class="left">Defluxit</div>
          <div class="content">
            14,000≤ downloads: Fading notification view in lock screen
          </div>
          <div class="left">Musubi</div>
          <div class="content">
            4,500≤ downloads: Android style pattern lock screen for iOS
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contributions">
    <h2>Open Source Contributions</h2>
    <div class="timeline">
      <div class="left">[2020~]</div>
      <div class="content">camelot: A fully-modular OCaml style linter</div>
      <div class="left">[2020~]</div>
      <div class="content">
        camelot-vscode: Visual Studio Code extension for camelot
      </div>
      <div class="left">[2020~]</div>
      <div class="content">svelte-tree: Tree view for svelte</div>
      <div class="left">[2020~]</div>
      <div class="content">
        svelte-promise-modal: A modal that uses promises for lifecycle
        management
      </div>
      <div class="left">[2020~]</div>
      <div class="content">
        svelte-procedures: Lifecycle management for procedural content on svelte
      </div>
      <div class="left">[2020~]</div>
      <div class="content">
        aligo-kakao-api: a nodejs wrapper for Aligo's KakaoTalk Notification API
      </div>
      <div class="left">[2020~]</div>
      <div class="content">
        express-modular-route-builder: a dynamic route builder middleware for
        express
      </div>
    </div>
  </section>

  <section id="experiences">
    <h2>Experiences</h2>
    <div class="timeline">
      <div class="left">[2020~]</div>
      <div class="content">
        (Frontend)
        <a href="https://pennlabs.org" target="_blank">
          Penn Labs: connecting students, resources, and data to improve life at
          Penn.
        </a>
      </div>
      <div class="left">[2020~]</div>
      <div class="content">
        (Fullstack) LXPER: English education startup developing learning tools
        with NLP technologies
      </div>
      <div class="left">[2019~]</div>
      <div class="content">(Fullstack) Dallem: Corporate wellness startup</div>
    </div>
  </section>

  <section id="honors">
    <h2>Honors</h2>
    <div class="timeline">
      <div class="left">[2020]</div>
      <div class="content">
        <a href="https://devpost.com/software/webstage-n6pqym" target="_blank">
          PennApps Winner: Best Use of Google Cloud: COVID-19 Hackathon Fund
        </a>
      </div>
      <div class="left">[2020~]</div>
      <div class="content">Presidential Science Scholar(대통령과학장학생)</div>
    </div>
  </section>

  <section id="education">
    <h2>Education</h2>
    <div class="timeline">
      <div class="left">[2020~]</div>
      <div class="content">
        <a href="https://nets.upenn.edu" target="_blank">
          University of Pennyslvania: Networked and Social Systems Engineering
          (NETS)
        </a>
      </div>
      <div class="left">[2015~2020]</div>
      <div class="content">CheongShim International Academy</div>
    </div>
  </section>

  <section id="etc">
    <h2>ETC</h2>
    <h3>Human Language</h3>
    <ul>
      <li>Korean (Native)</li>
      <li>English (Proficient)</li>
      <li>Chinese (Basic)</li>
    </ul>
    <h3>Tutoring Experiences</h3>
    <ul>
      <li>AP Computer Science</li>
      <li>AP Calculus</li>
    </ul>
  </section>

</div>
