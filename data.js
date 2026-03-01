let notificationsData = [
  {
    group: "Today",
    items: [
      { name: "Ravi", text: "QR scanned", time: "2 min ago", icon: "qr_code_scanner", type: "scan" },
      { name: "Delivery", text: "Package arrived", time: "10 min ago", icon: "inventory_2", type: "scan" },
      { name: "Rahul", text: "Call answered", time: "25 min ago", icon: "call", type: "answered" }
    ]
  },
  {
    group: "Yesterday",
    items: [
      { name: "Visitor", text: "Missed call", time: "1 day ago", icon: "phone_missed", type: "missed" },
      { name: "Amit", text: "Visitor message", time: "1 day ago", icon: "textsms", type: "scan" },
      { name: "Courier", text: "QR scanned", time: "1 day ago", icon: "qr_code_scanner", type: "scan" }
    ]
  },
  {
    group: "2 days ago",
    items: [
      { name: "Visitor", text: "Missed call", time: "1 day ago", icon: "phone_missed", type: "missed" },
      { name: "Amit", text: "Visitor message", time: "1 day ago", icon: "textsms", type: "scan" },
      { name: "Courier", text: "QR scanned", time: "1 day ago", icon: "qr_code_scanner", type: "scan" }
    ]
  }
  
];

function renderNotifications() {
  
  let html = "";
  let count = 0;
  
  notificationsData.forEach(section => {
    
    let sectionHTML = "";
    let hasVisibleItems = false;
    
    section.items.forEach(n => {
      if (count < visibleCount) {
        
        hasVisibleItems = true;
        count++;
        
        sectionHTML += `
          <div class="list-item ripple">
            <img src="https://i.pravatar.cc/40" class="avatar notificationavatar">

            <div class="details">
            <div class="name">${n.name}</div>
              <div class="activity-line">
                <span class="material-icons-outlined ${n.type}">
                  ${n.icon}
                </span>
                <div class="sub">${n.text}</div>
              </div>
            </div>

            <div class="time">${n.time}</div>
          </div>
        `;
      }
    });
    
    if (hasVisibleItems) {
      html += `
  <div class="card notificationcard ${disableAnimation ? 'no-animate' : ''}">
    <div class="time" style="margin-bottom:8px;font-weight:500">${section.group}</div>
    ${sectionHTML}
  </div>
`;
    }
    
  });
  
  // View more button
  if (visibleCount < totalNotifications()) {
    html += `
      <div class="caption" onclick="loadMoreNotifications()">
        View more
      </div>
    `;
  }
  
  content.innerHTML = html;
  initRipple();
}

//show more
function totalNotifications() {
  return notificationsData.reduce((sum, g) => sum + g.items.length, 0);
}

function loadMoreNotifications(){  
  visibleCount += 4;  
  disableAnimation = true;   // stop animation
  renderNotifications();  
  disableAnimation = false;  // reset
}


