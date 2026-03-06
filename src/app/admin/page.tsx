'use client'

import { useState, useEffect } from 'react'
import {
  FiGrid, FiFolder, FiMessageSquare, FiInfo, FiSave, FiPlus, FiTrash2, FiEye, FiEyeOff,
} from 'react-icons/fi'
import {
  getCompanyInfo,
  saveCompanyInfo,
  getServices,
  addService,
  updateService,
  deleteService,
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  getAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/lib/firestore'
import type { CompanyInfo, Service, Project, Testimonial, ServiceCategory, ProjectCategory } from '@/types'
import { DEFAULT_COMPANY } from '@/types'

type Tab = 'overview' | 'services' | 'projects' | 'testimonials'

const SERVICE_CATEGORIES: ServiceCategory[] = ['Construction', 'Renovation', 'Interior', 'Civil']
const PROJECT_CATEGORIES: ProjectCategory[] = ['Residential', 'Commercial', 'Renovation', 'Interior']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [company, setCompany] = useState<CompanyInfo>(DEFAULT_COMPANY)
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '', description: '', icon: 'FiHome', category: 'Construction', isAvailable: true, sortOrder: 0,
  })

  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '', description: '', category: 'Residential', location: '', year: new Date().getFullYear(),
    coverImage: '', images: [], isVisible: true, isFeatured: false, sortOrder: 0,
  })

  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    clientName: '', comment: '', rating: 5, projectType: '', location: '', isVisible: true,
  })

  useEffect(() => {
    const load = async () => {
      const [c, s, p, t] = await Promise.all([
        getCompanyInfo(), getServices(), getAllProjects(), getAllTestimonials(),
      ])
      if (c) setCompany(c)
      setServices(s)
      setProjects(p)
      setTestimonials(t)
    }
    load()
  }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  // ─── Company Info ─────────────────────────
  const handleSaveCompany = async () => {
    setSaving(true)
    await saveCompanyInfo(company)
    setSaving(false)
    showMessage('Company info saved!')
  }

  // ─── Services ─────────────────────────────
  const handleAddService = async () => {
    if (!newService.name) return
    const id = await addService(newService)
    setServices((prev) => [...prev, { ...newService, id }])
    setNewService({ name: '', description: '', icon: 'FiHome', category: 'Construction', isAvailable: true, sortOrder: 0 })
    showMessage('Service added!')
  }

  const handleToggleService = async (id: string, isAvailable: boolean) => {
    await updateService(id, { isAvailable: !isAvailable })
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, isAvailable: !isAvailable } : s))
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await deleteService(id)
    setServices((prev) => prev.filter((s) => s.id !== id))
    showMessage('Service deleted.')
  }

  // ─── Projects ─────────────────────────────
  const handleAddProject = async () => {
    if (!newProject.title) return
    const id = await addProject(newProject)
    setProjects((prev) => [...prev, { ...newProject, id }])
    setNewProject({ title: '', description: '', category: 'Residential', location: '', year: new Date().getFullYear(), coverImage: '', images: [], isVisible: true, isFeatured: false, sortOrder: 0 })
    showMessage('Project added!')
  }

  const handleToggleProject = async (id: string, isVisible: boolean) => {
    await updateProject(id, { isVisible: !isVisible })
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, isVisible: !isVisible } : p))
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await deleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    showMessage('Project deleted.')
  }

  // ─── Testimonials ──────────────────────────
  const handleAddTestimonial = async () => {
    if (!newTestimonial.clientName || !newTestimonial.comment) return
    const id = await addTestimonial(newTestimonial)
    setTestimonials((prev) => [...prev, { ...newTestimonial, id }])
    setNewTestimonial({ clientName: '', comment: '', rating: 5, projectType: '', location: '', isVisible: true })
    showMessage('Testimonial added!')
  }

  const handleToggleTestimonial = async (id: string, isVisible: boolean) => {
    await updateTestimonial(id, { isVisible: !isVisible })
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, isVisible: !isVisible } : t))
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await deleteTestimonial(id)
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
    showMessage('Testimonial deleted.')
  }

  const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Company Info', icon: FiInfo },
    { key: 'services', label: `Services (${services.length})`, icon: FiGrid },
    { key: 'projects', label: `Projects (${projects.length})`, icon: FiFolder },
    { key: 'testimonials', label: `Reviews (${testimonials.length})`, icon: FiMessageSquare },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl text-dark font-bold">Dashboard</h1>
        <p className="font-body text-muted text-sm mt-1">Manage your website content</p>
      </div>

      {/* Success message */}
      {message && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 font-body text-sm">
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Services', value: services.length, icon: '🔨' },
          { label: 'Projects', value: projects.length, icon: '🏗️' },
          { label: 'Reviews', value: testimonials.length, icon: '⭐' },
          { label: 'Featured', value: projects.filter((p) => p.isFeatured).length, icon: '📌' },
        ].map((stat) => (
          <div key={stat.label} className="admin-card flex items-center gap-4">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="font-display text-2xl text-dark font-bold">{stat.value}</p>
              <p className="font-body text-xs text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-dark border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ─── Company Info Tab ─── */}
      {activeTab === 'overview' && (
        <div className="admin-card space-y-5">
          <h2 className="font-display text-xl text-dark font-bold">Company Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Company Name', key: 'name' as const },
              { label: 'Tagline', key: 'tagline' as const },
              { label: 'Phone', key: 'phone' as const },
              { label: 'WhatsApp (numbers only)', key: 'whatsapp' as const },
              { label: 'Email', key: 'email' as const },
            ].map((field) => (
              <div key={field.key}>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">{field.label}</label>
                <input
                  type="text"
                  value={company[field.key] as string}
                  onChange={(e) => setCompany({ ...company, [field.key]: e.target.value })}
                  className="input-field"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block font-body text-sm font-medium text-dark mb-1.5">Address</label>
              <input
                type="text"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-body text-sm font-medium text-dark mb-1.5">About / Description</label>
              <textarea
                value={company.description}
                onChange={(e) => setCompany({ ...company, description: e.target.value })}
                rows={3}
                className="input-field resize-none"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-dark mb-1.5">Years Experience</label>
              <input
                type="number"
                value={company.yearsExperience}
                onChange={(e) => setCompany({ ...company, yearsExperience: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-dark mb-1.5">Projects Completed</label>
              <input
                type="number"
                value={company.projectsCompleted}
                onChange={(e) => setCompany({ ...company, projectsCompleted: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
          <button onClick={handleSaveCompany} disabled={saving} className="btn-primary gap-2">
            <FiSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* ─── Services Tab ─── */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-bold mb-4">Add New Service</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Service Name *</label>
                <input type="text" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} placeholder="e.g. Residential Construction" className="input-field" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Category *</label>
                <select value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value as ServiceCategory })} className="input-field">
                  {SERVICE_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Description</label>
                <textarea value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} rows={2} className="input-field resize-none" />
              </div>
            </div>
            <button onClick={handleAddService} className="btn-primary mt-4 gap-2">
              <FiPlus /> Add Service
            </button>
          </div>

          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-bold mb-4">All Services</h2>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-body font-semibold text-dark text-sm">{service.name}</span>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-body">{service.category}</span>
                      {!service.isAvailable && <span className="bg-gray-200 text-muted text-xs px-2 py-0.5 rounded-full font-body">Hidden</span>}
                    </div>
                    <p className="font-body text-muted text-xs mt-0.5 line-clamp-1">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleToggleService(service.id, service.isAvailable)} className={`p-2 rounded-lg transition-colors ${service.isAvailable ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-muted bg-gray-100 hover:bg-gray-200'}`}>
                      {service.isAvailable ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </button>
                    <button onClick={() => handleDeleteService(service.id)} className="p-2 rounded-lg text-red-400 bg-red-50 hover:bg-red-100 transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && <p className="text-center font-body text-muted text-sm py-8">No services added yet.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ─── Projects Tab ─── */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-bold mb-4">Add New Project</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Project Title *</label>
                <input type="text" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} placeholder="e.g. 3BHK Villa — Jubilee Hills" className="input-field" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Category *</label>
                <select value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value as ProjectCategory })} className="input-field">
                  {PROJECT_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Location</label>
                <input type="text" value={newProject.location} onChange={(e) => setNewProject({ ...newProject, location: e.target.value })} placeholder="e.g. Jubilee Hills, Hyderabad" className="input-field" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Year</label>
                <input type="number" value={newProject.year} onChange={(e) => setNewProject({ ...newProject, year: Number(e.target.value) })} className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Cover Image URL</label>
                <input type="text" value={newProject.coverImage} onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value })} placeholder="https://firebasestorage..." className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Description</label>
                <textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} rows={2} className="input-field resize-none" />
              </div>
            </div>
            <button onClick={handleAddProject} className="btn-primary mt-4 gap-2">
              <FiPlus /> Add Project
            </button>
          </div>

          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-bold mb-4">All Projects</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-body font-semibold text-dark text-sm">{project.title}</span>
                      <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full font-body">{project.category}</span>
                      {project.isFeatured && <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-body">Featured</span>}
                      {!project.isVisible && <span className="bg-gray-200 text-muted text-xs px-2 py-0.5 rounded-full font-body">Hidden</span>}
                    </div>
                    <p className="font-body text-muted text-xs mt-0.5">{project.location} · {project.year}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleToggleProject(project.id, project.isVisible)} className={`p-2 rounded-lg transition-colors ${project.isVisible ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-muted bg-gray-100 hover:bg-gray-200'}`}>
                      {project.isVisible ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </button>
                    <button onClick={() => handleDeleteProject(project.id)} className="p-2 rounded-lg text-red-400 bg-red-50 hover:bg-red-100 transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-center font-body text-muted text-sm py-8">No projects added yet.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ─── Testimonials Tab ─── */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-bold mb-4">Add Testimonial</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Client Name *</label>
                <input type="text" value={newTestimonial.clientName} onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Project Type</label>
                <input type="text" value={newTestimonial.projectType} onChange={(e) => setNewTestimonial({ ...newTestimonial, projectType: e.target.value })} placeholder="e.g. Residential Villa" className="input-field" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Location</label>
                <input type="text" value={newTestimonial.location} onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })} placeholder="e.g. Jubilee Hills" className="input-field" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Rating</label>
                <select value={newTestimonial.rating} onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })} className="input-field">
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-dark mb-1.5">Comment *</label>
                <textarea value={newTestimonial.comment} onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })} rows={3} className="input-field resize-none" />
              </div>
            </div>
            <button onClick={handleAddTestimonial} className="btn-primary mt-4 gap-2">
              <FiPlus /> Add Review
            </button>
          </div>

          <div className="admin-card space-y-3">
            <h2 className="font-display text-xl text-dark font-bold mb-4">All Reviews</h2>
            {testimonials.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-body font-semibold text-dark text-sm">{t.clientName}</span>
                    <span className="text-accent text-sm">{'★'.repeat(t.rating)}</span>
                    {!t.isVisible && <span className="bg-gray-200 text-muted text-xs px-2 py-0.5 rounded-full font-body">Hidden</span>}
                  </div>
                  <p className="font-body text-muted text-xs">{t.projectType} · {t.location}</p>
                  <p className="font-body text-dark text-sm mt-1 line-clamp-2">{t.comment}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleToggleTestimonial(t.id, t.isVisible)} className={`p-2 rounded-lg transition-colors ${t.isVisible ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-muted bg-gray-100 hover:bg-gray-200'}`}>
                    {t.isVisible ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                  </button>
                  <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 rounded-lg text-red-400 bg-red-50 hover:bg-red-100 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {testimonials.length === 0 && <p className="text-center font-body text-muted text-sm py-8">No reviews yet.</p>}
          </div>
        </div>
      )}
    </div>
  )
}
