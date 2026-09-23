const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
menu.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('#main-nav a').forEach(link=>link.addEventListener('click',()=>{header.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const calculator=document.querySelector('#entrance-calculator');
const total=document.querySelector('#entrance-total');
function calculate(){const data=new FormData(calculator);const children=Math.max(0,Number(data.get('children'))||0);const adults=Math.max(0,Number(data.get('adults'))||0);total.textContent=new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR',maximumFractionDigits:0}).format(children*60+adults*100)}
calculator.addEventListener('input',calculate);calculate();

document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{const select=document.querySelector('[name="service"]');select.value=link.dataset.service}));

const enquiry=document.querySelector('#enquiry-form');
enquiry.addEventListener('submit',event=>{event.preventDefault();const data=Object.fromEntries(new FormData(enquiry));const subject=encodeURIComponent(`Florence Palms enquiry: ${data.service}`);const body=encodeURIComponent(`Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email||'Not supplied'}\nPreferred date: ${data.date||'Flexible'}\nGuests: ${data.guests||'Not supplied'}\nEnquiry type: ${data.service}\n\nNotes:\n${data.notes||'None'}`);document.querySelector('#form-status').textContent='Your email app will open with the enquiry prepared. Sending it does not confirm a booking.';location.href=`mailto:admin@florencepalmsresort.co.za?subject=${subject}&body=${body}`});

const filters=document.querySelectorAll('[data-filter]');
const galleryItems=document.querySelectorAll('.gallery-item');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('active'));button.classList.add('active');galleryItems.forEach(item=>item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter)}));

const lightbox=document.querySelector('#lightbox');
const lightboxImage=lightbox.querySelector('img');
const lightboxCaption=lightbox.querySelector('p');
galleryItems.forEach(item=>item.addEventListener('click',()=>{const image=item.querySelector('img');lightboxImage.src=image.src;lightboxImage.alt=image.alt;lightboxCaption.textContent=item.querySelector('span').textContent;lightbox.showModal()}));
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
