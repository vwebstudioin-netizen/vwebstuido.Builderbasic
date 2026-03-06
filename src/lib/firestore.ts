import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  where,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { CompanyInfo, Service, Project, Testimonial } from '@/types'

// ─── Company Info ─────────────────────────────────────────────────

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const snap = await getDoc(doc(db, 'company', 'info'))
    return snap.exists() ? (snap.data() as CompanyInfo) : null
  } catch {
    return null
  }
}

export async function saveCompanyInfo(data: Partial<CompanyInfo>): Promise<void> {
  await setDoc(doc(db, 'company', 'info'), { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

// ─── Services ─────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  try {
    const q = query(collection(db, 'services'), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service))
  } catch {
    return []
  }
}

export async function getAvailableServices(): Promise<Service[]> {
  try {
    const q = query(
      collection(db, 'services'),
      where('isAvailable', '==', true),
      orderBy('sortOrder')
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service))
  } catch {
    return []
  }
}

export async function addService(data: Omit<Service, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'services'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export async function updateService(id: string, data: Partial<Service>): Promise<void> {
  await updateDoc(doc(db, 'services', id), data)
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, 'services', id))
}

// ─── Projects ─────────────────────────────────────────────────────

export async function getVisibleProjects(): Promise<Project[]> {
  try {
    const q = query(
      collection(db, 'projects'),
      where('isVisible', '==', true),
      orderBy('sortOrder')
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project))
  } catch {
    return []
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, 'projects'), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project))
  } catch {
    return []
  }
}

export async function addProject(data: Omit<Project, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  await updateDoc(doc(db, 'projects', id), data)
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, 'projects', id))
}

// ─── Testimonials ──────────────────────────────────────────────────

export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(collection(db, 'testimonials'), where('isVisible', '==', true))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial))
  } catch {
    return []
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const snap = await getDocs(collection(db, 'testimonials'))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial))
  } catch {
    return []
  }
}

export async function addTestimonial(data: Omit<Testimonial, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'testimonials'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<void> {
  await updateDoc(doc(db, 'testimonials', id), data)
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, 'testimonials', id))
}
