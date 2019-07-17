new Vue ({
  el: '#app',
  data: {
    groups: "open source, academia",
    labels: "Software Engineering, Open Source Development, User Support, Research, Documentation",
    chart: undefined,
    title: "Research Software Engineer Phenotype: Dinosaur",
    datasetTemplate: { 
      label: 'open source',
      backgroundColor: [
        'rgba(0, 0, 0, 0.0)',
      ],
      borderColor: [],
      borderWidth: 3
    }    
  },
  mounted: function() {
    this.render();
  },
  methods: {
    clone: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    // Helper functions
    getRandomColor: function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    saveImage: function() {

        var canvas = document.getElementById("rse-generator");
        canvas.toBlob(function(blob) {
            saveAs(blob, "my-rse-phenotype.png");
        });
    },

    // Functions to split variables by delimiter of choice
    getLabels: function() {
        return this.labels.split(",");
    },
    getGroups: function() {
        return this.groups.split(",");
    },

    // Generate Data and plots
    genData: function(label) {
      var values = [100]; // Cap at 100
      for(var i = 0; i < this.getLabels().length -1; i++) {
        values.push(Math.floor(Math.random() * 30))
      }
      
      var data = this.clone(this.$data.datasetTemplate);
      data.data = values;
      var borderColor = this.getRandomColor();
      data.borderColor.push(borderColor);
      data.label = label;
      
      return data;
    },

    // Functions to update a field, and then re-render the plot
    updateDimensions: function(event) {
        this.labels = event.target.value;
        this.render(); 
    },

    updateGroups: function(event) {
        this.groups = event.target.value;
        this.render(); 
    },

    updateTitle: function(event) {
        this.title = event.target.value;
        this.render(); 
    },

    render: function() {
      if (this.chart)
        this.chart.destroy()
      var canvas = document.getElementById("rse-generator");
      var ctx = canvas.getContext('2d');
      var groups = this.getGroups();

      // Generate datasets
      var datasets = Array();
      for(var i = 0; i < groups.length; i++) {
          datasets.push(this.genData(groups[i]));
      }

      this.chart = new Chart(ctx, {
          type: 'radar',
          data: {
              labels: this.getLabels(),
              datasets: datasets
          },
          options: {
            dragData: true,
            title: {
                padding: 30,
                display: true,
                text: this.title,
            },
            legend: {
               display: true,
               position: "left"
            }
          }
      });
    }
  }
})
